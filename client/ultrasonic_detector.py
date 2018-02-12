import RPi.GPIO as GPIO
import time
import statistics
import logging

class UltrasonicDetector:
    trigger_pin = 23
    echo_pin = 24
    def __init__(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.trigger_pin, GPIO.OUT)
        GPIO.setup(self.echo_pin, GPIO.IN)

    def __del__(self):
        GPIO.cleanup()

    def send_trigger_pulse(self):
        GPIO.output(self.trigger_pin, True)
        time.sleep(0.001)
        GPIO.output(self.trigger_pin, False)

    def wait_for_echo(self, value, timeout):
        count = timeout
        while GPIO.input(self.echo_pin) != value and count > 0:
            count = count - 1

    def get_distance_cm(self):
        self.send_trigger_pulse()
        self.wait_for_echo(True, 5000)
        start = time.time()
        self.wait_for_echo(False, 5000)
        finish = time.time()
        pulse_len = finish - start
        distance_cm = pulse_len * 340 * 100 / 2
	logging.debug("cm=%f" % distance_cm) 
        return distance_cm

    def check_occupation(self, sample_size, sample_interval_s, criterion):
        distance_cm_list = []
        for i in range(0, sample_size):
            distance_cm_list.append(self.get_distance_cm())
            time.sleep(sample_interval_s)

        distance_median_cm = statistics.median(distance_cm_list)
        return (distance_median_cm < criterion)

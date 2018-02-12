import requests
import time
import argparse
import os
import logging
from logging.handlers import RotatingFileHandler
from ultrasonic_detector import UltrasonicDetector

def update_status(toilet_id, is_occupied, host):
    in_use = 'true' if is_occupied else 'false'
    try:
        update_api = 'http://' + host + ':5000/api/status'
        req = requests.post(update_api, data={'id': toilet_id, 'inUse': in_use})
        if req.status_code != 200:
            logging.error(req.status_code, req.reason)
        else:
            logging.debug('Update status to server done')
    except:
        logging.error('Failed to update status due to network problems')

def parse_args():
    parser = argparse.ArgumentParser(description='rrubd')
    parser.add_argument('--id', required=True, help='the toilet id.')
    parser.add_argument('--criterion', required=True, help='the distance criterion to decide the occupation.')
    parser.add_argument('--host', required=False, default='10.1.230.11', help='the host ip, default is 10.1.230.11.')
    args = parser.parse_args()
    return args

def init_log():
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logpath = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'rrubd.log')
    handler = RotatingFileHandler(logpath, maxBytes=1000000, backupCount=7)
    logger.addHandler(handler)

if __name__ == '__main__':
    init_log()
    args = parse_args()
    ultrasonic_detector = UltrasonicDetector()
    try:
        while True:
            # Sample size is five times and sample interval is one second
            is_occupied = ultrasonic_detector.check_occupation(5, 1, args.criterion)
            logging.debug('Toilet %s is %s' % (args.id, 'occupied' if is_occupied else 'available'))
            update_status(args.id, is_occupied, args.host)
    except KeyboardInterrupt:
        del ultrasonic_detector

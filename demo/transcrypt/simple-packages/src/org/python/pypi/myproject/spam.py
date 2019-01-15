# org/python/pypi/myproject/spam.py

import org.python.pypi.myproject.ham
import org.python.pypi.myproject.eggs
import org.python.pypi.myproject.eggs.eggs as eggs
#from . import ham
#from .eggs import eggs


def get_menu():
    now = org.python.pypi.myproject.ham.now()
    return now, [
        __name__,
        __name__,
        org.python.pypi.myproject.ham.__name__,
        eggs.__name__,
        __name__,
        __name__,
        __name__,
        ]

print(__name__)

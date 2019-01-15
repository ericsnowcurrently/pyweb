# spam.py

import org
import org.python
import org.python.pypi
import org.python.pypi.myproject
import org.python.pypi.myproject.spam


def fail():
    raise Exception('oops!')


print(__name__)

print()
now, menu = org.python.pypi.myproject.spam.get_menu()
print(f'menu at {now}s:')
for index, item in enumerate(menu, 1):
    print(f' {index}: {item}')
print()

fail()

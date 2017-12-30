*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Suite Setup    Open Browser And Login As student
Suite Teardown    Close Browser

*** Test Cases ***
Verify Student Course
    User Course Should Contains    MyClass    teacher1    星期三 17:00~18:00    60    MyClass
    User Enter The MyClass
    
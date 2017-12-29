*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    Keywords.txt
Suite Setup    Open Browser And Login As admin
Suite Teardown    Close Browser

*** Test Cases ***
AdminAddStrudentToCourse
    Create One account Account And Verify It    teacher    teacher1
    Create One account Account And Verify It    student    student1
    Create One account Account And Verify It    student    student2
    Create One Course And Verify It    MyClass    teacher1    星期三 17:00~18:00    60    MyClass
    Choose Course    MyClass    student1    student2
    Delete Student    student1    student2
    Delete Teacher    teacher1
    Delete Course    MyClass

*** Keywords ***



*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Suite Setup    Open Chrom Browser
Suite Teardown    Close Browser

*** Test Cases ***
Admin Create Account And Verify It
    Login As admin
    Create One Account    teacher    teacher1
    Create One Account    teacher    teacher2
    Create One Account    student    student1
    Create One Account    student    student2
    Verify Account List Student    student1    student2
    Verify Account List Teacher    teacher1    teacher2
    Delete All Account
*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
# Suite Setup    Open Browser And Login As admin
Suite Teardown    Close Browser

*** Test Cases ***
Admin Login     
    Open Browser And Login As admin




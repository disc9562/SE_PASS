*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Suite Teardown    Close Browser

*** Test Cases ***
Admin Login     
    Open Chrom Browser
    Login As admin
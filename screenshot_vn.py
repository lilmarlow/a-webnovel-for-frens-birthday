from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto('http://localhost:8000')

    # Wait for login and click it
    page.click('#login-button')

    # Wait for dialogue to appear
    page.wait_for_selector('#dialogue-box', state='visible')

    # Take screenshot
    page.screenshot(path='/app/screenshot.png')
    browser.close()

# Bin Awan store (Python / Flask)

Online perfume store with admin panel: products, categories, orders, order tracking,
Cash on Delivery, bank / JazzCash payment with mandatory screenshot, editable pages
(founder, owners, about, FAQs, policies), contact messages, email alerts.

## Run on your computer
    pip install -r requirements.txt
    python app.py
Open http://localhost:5000 . The first run prints the admin password in the terminal.
Admin panel: http://localhost:5000/admin

Set your own login before the first run (optional):
    ADMIN_USER=owner ADMIN_PASSWORD=ChooseStrong123 python app.py

## Publish (www.binawanpk.com)
Any Python host works: Render, Railway, PythonAnywhere, or a VPS.
- Start command: `gunicorn app:app --bind 0.0.0.0:$PORT`
- Environment variables: SECRET_KEY (long random text), ADMIN_PASSWORD
- Keep the `instance/` folder on a persistent disk. It holds the database, product
  photos and payment screenshots. Without a persistent disk they are lost on redeploy.
- Point your domain to the host (DNS CNAME/A record as the host explains) and enable HTTPS.

## First steps in Admin
1. Settings: check phone, WhatsApp, bank and JazzCash details, delivery charge, SMTP email.
2. Products: delete the 5 sample products and add the real ones with photos.
3. Pages: write the founder and owners pages.

Payment screenshots are private: only a logged-in admin can open them.

## Notifications
- Email: Admin, Settings, Email. Use a Gmail address with an App Password (smtp.gmail.com, port 587).
  Then press "Send test email". Every email attempt is listed in Admin, Notification log.
- WhatsApp: every order page in Admin has ready WhatsApp buttons (confirmation, shipped with tracking ID).
  Fully automatic WhatsApp needs a Meta WhatsApp Cloud API account and approved message templates.

## Courier tracking
Open an order in Admin, choose the courier (PostEx, Leopards, Pakistan Post, TCS...), paste the tracking ID,
set status to Shipped and Save. The customer is emailed and sees it on the Track order page.
Check the courier tracking links in app.py (COURIERS) once; you can also paste a custom link per order.

## New in this version
- Customer accounts: Login / Sign up, order history, saved address, forgot password. Admin sees them in Customers.
- Live chat: assistant answers first (built-in, or smarter with an Anthropic API key in Settings), customer can tap
  "Talk to a human" and you reply from Admin > Live chat.
- Find your scent quiz, longevity and projection meters, multiple photos per product.
- Admin > Colors & fonts: ready themes, custom colors, font styles, logo.
- Admin > Message templates: edit every email and WhatsApp text. Placeholders like {name} {order_code} {tracking_id}.
- Admin > Bulk import: paste "Name | Price | Category | Image link" lines.

## Emails going to spam: what to do
1. Send from an address on your own domain (for example orders@binawanpk.com), not from a free address with another name.
2. Use a proper sender service: Gmail with an App Password works for small shops. For best results use Brevo, Resend or
   SendGrid (free plans exist) and put their SMTP details in Admin > Settings > Email.
3. In your domain's DNS add the SPF and DKIM records the email service gives you, and a DMARC record. This is the
   single biggest fix for spam folders.
4. Ask customers to mark the first email "Not spam". Use Admin > Settings > "Send test email" to check.

## WhatsApp
- The WhatsApp buttons on the site open a chat with your number and a ready-typed message (edit it in Settings).
- To reply automatically when a customer messages you, install the WhatsApp Business app on that number and turn on
  Greeting message and Away message (Settings > Business tools).

## Before you point www.binawanpk.com to this new store
The logo is currently linked from the old site. Download your logo and product photos first and upload them
(Admin > Colors & fonts, and each product), because the old images vanish when the old site is replaced.

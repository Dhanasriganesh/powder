/* eslint-disable no-console */
import nodemailer from 'nodemailer'

// Usage:
// 1) Set env vars (recommended):
//    SMTP_USER=groupartihcus@gmail.com SMTP_PASS=wqgopmkslbkeuin node scripts/email.js \
//      --to "customer@example.com" --name "Harsha" --total 999 --method "Razorpay" \
//      --address "Line 1\nCity, State 500001" --items '[{"title":"Sassy Sunnipindi 200g","quantity":1,"price":299}]'
// 2) Or create a .env and run with dotenv (optional integration not included here)

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {}
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]
    const val = args[i + 1]
    if (key && key.startsWith('--')) out[key.slice(2)] = val
  }
  return out
}

const createTransporter = () => {
  const user = process.env.SMTP_USER || 'groupartihcus@gmail.com'
  const pass = process.env.SMTP_PASS || 'wqgopmkslbkeuin' // Gmail app password
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

function createEcommerceEmailTemplate(data) {
  const itemsHtml = (data.orderItems || [])
    .map(
      (i) =>
        `<li><strong>${i.title}</strong> × ${i.quantity} — ₹${i.price} each (₹${
          i.price * i.quantity
        })</li>`
    )
    .join('')

  const addressHtml = (data.customerAddress || 'Not provided')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('<br/>')

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation - The Powder Legacy</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); overflow: hidden; }
        .header { padding: 24px; text-align: center; border-bottom: 1px solid #eee; }
        h1 { margin: 0; font-size: 22px; color: #2c3e50; }
        .content { padding: 24px; line-height: 1.6; }
        .section { margin: 18px 0; }
        .card { background: #f8f9fa; padding: 16px; border-radius: 8px; }
        .items ul { margin: 8px 0 0 20px; padding: 0; }
        .items li { margin: 6px 0; }
        .label { color: #555; }
        .value { font-weight: bold; }
        .amount { color: #15803d; font-weight: bold; }
        .footer { padding: 20px; text-align: center; border-top: 1px solid #eee; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Your Order is Confirmed</h1>
        </div>
        <div class="content">
          <p>Hi ${data.customerName || 'Customer'},</p>
          <p>Thank you for shopping with The Powder Legacy! Your order has been successfully confirmed.</p>

          <div class="section card items">
            <div class="label"><strong>📦 Order Details</strong></div>
            <ul>${itemsHtml}</ul>
            <p><span class="label">Total Amount:</span> <span class="amount">₹${data.orderTotal}</span></p>
            <p><span class="label">Payment Method:</span> <span class="value">${data.paymentMethod || 'Razorpay'}</span></p>
          </div>

          <div class="section card">
            <div class="label"><strong>🏠 Delivery Address</strong></div>
            <p style="margin: 8px 0 0; white-space: normal;">${addressHtml}</p>
          </div>

          <p>If you have any questions or need assistance, reply to this email.</p>
          <p>Warm Regards,<br/>The Powder Legacy</p>
        </div>
        <div class="footer">
          <div>📧 ${process.env.SMTP_USER || 'groupartihcus@gmail.com'}</div>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendEcommerceOrderConfirmationEmail(data) {
  const transporter = createTransporter()
  const from = process.env.SMTP_USER || 'groupartihcus@gmail.com'
  const mailOptions = {
    from,
    to: data.customerEmail,
    subject: '✅ Your Order with The Powder Legacy is Confirmed',
    html: createEcommerceEmailTemplate(data),
  }
  const info = await transporter.sendMail(mailOptions)
  console.log('Order email sent:', info.messageId)
  return true
}

async function main() {
  const args = parseArgs()
  if (!args.to) {
    console.error('Missing --to email address')
    process.exit(1)
  }

  const orderItems = (() => {
    try { return JSON.parse(args.items || '[]') } catch { return [] }
  })()

  const payload = {
    orderName: args.orderName || 'TPL-ORDER',
    customerName: args.name || 'Customer',
    customerEmail: args.to,
    orderItems,
    orderTotal: Number(args.total || 0),
    paymentMethod: args.method || 'Razorpay',
    customerAddress: args.address || '',
  }

  try {
    await sendEcommerceOrderConfirmationEmail(payload)
  } catch (err) {
    console.error('Failed to send email:', err?.message || err)
    process.exit(1)
  }
}

// Execute when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

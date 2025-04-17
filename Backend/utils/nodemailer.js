import nodemailer from "nodemailer"

export const sendResetEmail = async (email, resetLink) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap');

    body {
      background-color: #fef6ff;
      font-family: 'Nunito', sans-serif;
      text-align: center;
      color: #4b2e83;
      padding: 30px;
    }

    .container {
      background-color: #fff0fa;
      border: 2px solid #e3a7e4;
      border-radius: 15px;
      padding: 30px;
      max-width: 500px;
      margin: auto;
      box-shadow: 0 0 20px rgba(255, 105, 180, 0.2);
    }

    .gif {
      width: 120px;
      margin-bottom: 15px;
    }

    .btn {
      background-color: #ff85b3;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 30px;
      display: inline-block;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #f46b9c;
    }

    .footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Uh-oh! Lost your password?</h2>
    <p>No worries~ Just click the magic button below ✨</p>
    <a class="btn" href="${resetLink}">Reset Your Password</a>
    <p class="footer">This link will expire in 15 minutes. Be quick like a ninja! 🥷</p>
  </div>
</body>
</html>
`
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `Extrobuy <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🔒 Reset Your Password !",
      html: html,
    }
    const info = await transporter.sendMail(mailOptions)
    return info.response
  } catch (error) {
    console.log("error", error)
    throw error
  }
}

export const sendRegisteredUser = async (email, name) => {
  try {
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to ExtroBuy</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Roboto:wght@400;700&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Roboto', sans-serif; background-color: #1a1a1a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #fff2cc; margin: 20px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 0 25px rgba(255, 165, 0, 0.4);">
            <!-- Header -->
            <tr>
              <td style="background-color: #f57c00; padding: 30px 40px; text-align: center; color: white; font-family: 'Bangers', cursive;">
                <h1 style="margin: 0; font-size: 40px; letter-spacing: 1px;">WELCOME TO EXTROBUY</h1>
                <p style="margin: 5px 0 0; font-size: 20px;">Unleash the Saiyan shopper in you!</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px 40px; color: #000;">
                <p style="font-size: 18px;">Hey <strong>${name}</strong>! 👋</p>
                <p style="font-size: 16px; line-height: 1.6;">
                  You’ve just powered up and joined the ExtroBuy universe — where legendary deals await. 🛍️✨
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                  Channel your inner Goku and get ready to:
                </p>
                <ul style="font-size: 16px; padding-left: 20px;">
                  <li>💥 Battle high prices with exclusive discounts</li>
                  <li>⚡ Train your cart with hot products</li>
                  <li>🔥 Go Super Saiyan with fast delivery</li>
                </ul>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:5173/" style="background-color: #039be5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                    Start Shopping Like a Saiyan
                  </a>
                </div>
                <p style="font-size: 14px; color: #555;">
                  Got questions? Use Instant Transmission (or just reply to this email).
                </p>
                <p style="font-size: 16px;">Stay powerful,<br/>The ExtroBuy Team 🛸</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #212121; color: #bbb; text-align: center; padding: 20px; font-size: 13px;">
                © 2025 ExtroBuy Inc. | All Rights Reserved<br/>
                <a href="http://localhost:5173/contact" style="color: #bbb; text-decoration: none;">Contact Us</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })

    const mailOptions = {
      from: `Extrobuy <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to ExtroBuy!",
      html: html
    }
    return await transporter.sendMail(mailOptions)
  } catch (error) {
    throw error
  }
}



export const sendOrderConfirmationEmail = async (email, name, order) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Order Confirmation</title>
  <style>
    body {
      background-color: #f3f4f6;
      font-family: Arial, sans-serif;
      padding: 30px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      max-width: 600px;
      margin: auto;
      padding: 25px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }
    h2 {
      color: #4CAF50;
    }
    .order-details {
      margin-top: 20px;
    }
    .order-details table {
      width: 100%;
      border-collapse: collapse;
    }
    .order-details th, .order-details td {
      padding: 8px 12px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    .footer {
      margin-top: 30px;
      font-size: 0.9em;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Hey ${name}, your order has been placed successfully! 🎉</h2>
    <p>Thank you for shopping with ExtroBuy. Below are your order details:</p>

    <div class="order-details">
      <table>
        <tr><th>Order ID:</th><td>${order.order_id}</td></tr>
        <tr><th>Name:</th><td>${order.first_name} ${order.last_name}</td></tr>
        <tr><th>Shipping Address:</th><td>${order.street}, ${order.city}, ${order.state} - ${order.pincode}, ${order.country}</td></tr>
        <tr><th>Email:</th><td>${order.email}</td></tr>
        <tr><th>Phone:</th><td>${order.phone}</td></tr>
        <tr><th>Payment Method:</th><td>${order.payment_method}</td></tr>
        <tr><th>Payment Status:</th><td>${order.payment_status}</td></tr>
        <tr><th>Order Status:</th><td>${order.order_status}</td></tr>
        <tr><th>Subtotal:</th><td>₹${order.subtotal}</td></tr>
        <tr><th>Shipping Fee:</th><td>₹${order.shipping_fee}</td></tr>
        <tr><th>Total:</th><td><strong>₹${order.total_amount}</strong></td></tr>
        <tr><th>Order Date:</th><td>${new Date(order.created_at).toLocaleString()}</td></tr>
      </table>
    </div>

    <p style="margin-top: 20px;">We’ll notify you once your order is on its way. 🚚</p>

    <div class="footer">
      If you have any questions, reply to this email or <a href="http://localhost:5173/contact">contact us here</a>.<br/>
      — Team ExtroBuy
    </div>
  </div>
</body>
</html>
`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `ExtroBuy <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🛍️ Your ExtroBuy Order Has Been Placed!",
      html: html,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Order confirmation email error:", error);
    throw error;
  }
};

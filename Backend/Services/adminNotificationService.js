import db from "../Config/db.js";
import { sendAdminNewOrderEmail } from "../utils/nodemailer.js";

export const resolveAdminNotificationRecipients = (dbEmails = [], envValue = "") => {
  const envEmails = envValue
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return [...new Set([...dbEmails, ...envEmails])];
};

export const getAdminNotificationRecipients = async () => {
  const adminRows = await db.query(
    "SELECT email FROM users WHERE isadmin = TRUE AND email IS NOT NULL AND email <> ''"
  );

  return resolveAdminNotificationRecipients(
    adminRows.rows.map((row) => row.email),
    process.env.ADMIN_NOTIFICATION_EMAIL || ""
  );
};

export const notifyAdminsOfNewOrder = async (order) => {
  const recipients = await getAdminNotificationRecipients();

  if (!recipients.length) {
    return { notified: false, recipients: [] };
  }

  await sendAdminNewOrderEmail(recipients, order);
  return { notified: true, recipients };
};

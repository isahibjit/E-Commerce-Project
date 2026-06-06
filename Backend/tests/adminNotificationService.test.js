import test from "node:test";
import assert from "node:assert/strict";

const { resolveAdminNotificationRecipients } = await import("../Services/adminNotificationService.js");

test("resolveAdminNotificationRecipients merges db and env recipients without duplicates", () => {
  const recipients = resolveAdminNotificationRecipients(
    ["admin1@example.com", "admin2@example.com"],
    "admin2@example.com, ops@example.com , "
  );

  assert.deepEqual(recipients, [
    "admin1@example.com",
    "admin2@example.com",
    "ops@example.com",
  ]);
});

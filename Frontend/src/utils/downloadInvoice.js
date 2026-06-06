import axios from "axios";

const getFileNameFromDisposition = (contentDisposition, fallbackFileName) => {
  const matchedFileName = contentDisposition?.match(/filename="?(?<fileName>[^"]+)"?/i);
  return matchedFileName?.groups?.fileName || fallbackFileName;
};

export const downloadInvoice = async ({ backendApi, orderId }) => {
  const response = await axios.get(`${backendApi}api/orders/${orderId}/invoice`, {
    withCredentials: true,
    responseType: "blob",
  });

  const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
  const link = document.createElement("a");
  const fileName = getFileNameFromDisposition(
    response.headers["content-disposition"],
    `invoice-${orderId}.pdf`
  );

  link.href = blobUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

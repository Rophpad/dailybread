import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import type { CartItem } from "~/types/cartItem";

export const useGlobalStore = defineStore("global", () => {
  const newProductAdded = ref(false);
  const productQuantity = ref(1);

  const resetProductQuantity = () => {
    productQuantity.value = 1;
  };

  const showNewProductIsAdded = () => {
    newProductAdded.value = true;
    setTimeout(() => {
      newProductAdded.value = false;
    }, 2000); // Hide after 2 seconds
  };

  const handleCommand = (items: CartItem[], total: number) => {
    if (items.length === 0) {
      alert("Votre panier est vide!");
      return;
    }

    // Generate order text
    const orderText = generateOrderText(items, total);

    // Create and download text file
    downloadOrderFile(orderText);

    // Send via Mail
    // sendViaMail(orderText);
    sendViaWhatsApp(orderText);
  };

  const generateOrderText = (cartItems: CartItem[], total: number) => {
    const currentDate = new Date().toLocaleDateString("fr-FR");
    const currentTime = new Date().toLocaleTimeString("fr-FR");

    let orderText = `🍞 COMMANDE DAILYBREAD 🍞\n`;
    orderText += `Date: ${currentDate} à ${currentTime}\n`;
    orderText += `\n📋 DÉTAILS DE LA COMMANDE:\n`;
    orderText += `${"-".repeat(30)}\n`;

    // Group items by type
    const breads = cartItems.filter((item) => item.product.type === "bread");
    const accompaniments = cartItems.filter(
      (item) => item.product.type === "accompaniment"
    );

    if (breads.length > 0) {
      orderText += `\n🥖 PAINS:\n`;
      breads.forEach((item, index) => {
        const itemTotal = (
          parseFloat(item.product.price.replace("$", "")) * item.quantity
        ).toFixed(2);
        orderText += `${index + 1}. ${item.product.name}\n`;
        orderText += `   Quantité: ${item.quantity}\n`;
        orderText += `   Prix unitaire: ${item.product.price}\n`;
        orderText += `   Sous-total: ${itemTotal} FCFA\n\n`;
      });
    }

    if (accompaniments.length > 0) {
      orderText += `🥯 ACCOMPAGNEMENTS:\n`;
      accompaniments.forEach((item, index) => {
        const itemTotal = (
          parseFloat(item.product.price.replace(" FCFA", "")) * item.quantity
        ).toFixed(2);
        orderText += `${index + 1}. ${item.product.name}\n`;
        orderText += `   Quantité: ${item.quantity}\n`;
        orderText += `   Prix: ${item.product.price}\n`;
        orderText += `   Sous-total: ${itemTotal} FCFA\n\n`;
      });
    }

    orderText += `${"-".repeat(30)}\n`;
    orderText += `💰 TOTAL: ${total.toFixed(2)} FCFA\n`;
    orderText += `${"-".repeat(30)}\n`;
    orderText += `\n📞 Merci pour votre commande!\n`;
    orderText += `DailyBread - Pain frais tous les jours`;

    return orderText;
  };

  const downloadOrderFile = (orderText: string) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const timeStringParts = new Date().toTimeString().split(" ");
    const currentTime = timeStringParts[0]
      ? timeStringParts[0].replace(/:/g, "-")
      : "";
    const filename = `commande-dailybread-${currentDate}-${currentTime}.txt`;

    const blob = new Blob([orderText], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  const sendViaMail = (orderText: string) => {
    // Recipient email address (replace with actual email)
    const recipientEmail = "zetekas.pro@gmail.com"; // Replace with your email

    // Subject and body
    const subject = encodeURIComponent("Commande DailyBread");
    const body = encodeURIComponent(orderText);

    // Create mailto URL
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Open default mail client
    window.open(mailtoUrl, "_blank");
  };

  const sendViaWhatsApp = (orderText: string) => {
    const formattedOrderText = orderText
      .replace(/ /g, "%20")
      .replace(/\n/g, "%0A");
    const phoneNumber = "+22996908483"; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      formattedOrderText
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return {
    newProductAdded,
    productQuantity,
    resetProductQuantity,
    showNewProductIsAdded,
    handleCommand,
  };
});

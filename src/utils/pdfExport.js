import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, fileName) => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error("Element not found");
    return;
  }

  try {
    // Temporarily hide buttons for screenshot
    const buttons = element.querySelectorAll("button");
    const tableActions = document.querySelectorAll(".table-actions");

    buttons.forEach((btn) => (btn.style.display = "none"));
    tableActions.forEach((ta) => (ta.style.display = "none"));

    // Hide delete column
    const deleteHeaders = element.querySelectorAll("table th:last-child");
    const deleteCells = element.querySelectorAll("table td:last-child");
    deleteHeaders.forEach((th) => (th.style.display = "none"));
    deleteCells.forEach((td) => (td.style.display = "none"));

    // Style inputs to show their values clearly in PDF
    const inputs = element.querySelectorAll("input, textarea, select");
    const originalStyles = [];

    inputs.forEach((input, index) => {
      originalStyles[index] = {
        border: input.style.border,
        borderBottom: input.style.borderBottom,
        background: input.style.background,
        outline: input.style.outline,
        padding: input.style.padding,
        boxShadow: input.style.boxShadow,
        color: input.style.color,
      };

      // Keep the text visible but remove borders
      input.style.border = "none";
      input.style.borderBottom = "none";
      input.style.background = "transparent";
      input.style.outline = "none";
      input.style.boxShadow = "none";
      input.style.color = "black";
      input.style.padding = "0";
    });

    // Wait a bit for styles to apply
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(`${fileName}.pdf`);

    // Restore original styles
    buttons.forEach((btn) => (btn.style.display = ""));
    tableActions.forEach((ta) => (ta.style.display = ""));
    deleteHeaders.forEach((th) => (th.style.display = ""));
    deleteCells.forEach((td) => (td.style.display = ""));

    inputs.forEach((input, index) => {
      input.style.border = originalStyles[index].border;
      input.style.borderBottom = originalStyles[index].borderBottom;
      input.style.background = originalStyles[index].background;
      input.style.outline = originalStyles[index].outline;
      input.style.padding = originalStyles[index].padding;
      input.style.boxShadow = originalStyles[index].boxShadow;
      input.style.color = originalStyles[index].color;
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại.");
  }
};

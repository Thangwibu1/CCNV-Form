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
        height: input.style.height,
        overflow: input.style.overflow,
      };

      // Keep the text visible but remove borders for clean PDF
      input.style.border = "none";
      input.style.borderBottom = "none";
      input.style.background = "transparent";
      input.style.outline = "none";
      input.style.boxShadow = "none";
      input.style.color = "black";
      input.style.padding = "0.5rem";
    });

    // Convert textareas to divs for better PDF rendering
    const textareas = element.querySelectorAll("textarea");
    const textareaReplacements = [];

    textareas.forEach((textarea) => {
      const div = document.createElement("div");
      div.textContent = textarea.value;

      // Copy computed styles
      const computedStyle = window.getComputedStyle(textarea);
      div.style.fontFamily = computedStyle.fontFamily;
      div.style.fontSize = computedStyle.fontSize;
      div.style.lineHeight = computedStyle.lineHeight;
      div.style.padding = computedStyle.padding;
      div.style.textAlign = computedStyle.textAlign;
      div.style.color = "black";
      div.style.whiteSpace = "pre-wrap";
      div.style.wordWrap = "break-word";
      div.style.wordBreak = "break-word";
      div.style.overflowWrap = "break-word";
      div.style.overflow = "visible";
      div.style.border = "none";
      div.style.background = "transparent";
      div.style.minHeight = "40px";

      textareaReplacements.push({
        original: textarea,
        replacement: div,
        parent: textarea.parentNode,
      });

      textarea.parentNode.replaceChild(div, textarea);
    });

    // Wait for layout to stabilize
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create canvas from HTML element with optimized settings for all forms
    const canvas = await html2canvas(element, {
      scale: 1.5, // Balanced scale for quality and proportion
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 900, // Optimized width to match form container max-width
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

    // Restore textareas
    textareaReplacements.forEach(({ original, replacement, parent }) => {
      parent.replaceChild(original, replacement);
    });

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
      input.style.height = originalStyles[index].height;
      input.style.overflow = originalStyles[index].overflow;
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại.");
  }
};

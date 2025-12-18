import { useState } from "react";
import { exportToPDF } from "../utils/pdfExport";
import logoImg from "../assets/logo.png";

function PhieuXuatKho() {
  const [formData, setFormData] = useState({
    ngay: "",
    thang: "",
    nam: "",
    so: "",
    nguoiNhan: "",
    theoSo: "",
    ngayThang: "",
    diaDiemXuat: "",
    tongSoTien: "",
    soChungTu: "",
    soTienChuCuoi: "",
  });

  const [items, setItems] = useState([
    {
      stt: "A",
      tenNhanHieu: "B",
      donViTinh: "C",
      yeuCau: "D",
      thucXuat: "1",
      donGia: "2",
      thanhTien: "3",
    },
    {
      stt: "",
      tenNhanHieu: "",
      donViTinh: "",
      yeuCau: "",
      thucXuat: "",
      donGia: "",
      thanhTien: "",
    },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Auto calculate thành tiền (skip first row which is header)
    if (index > 0 && (field === "thucXuat" || field === "donGia")) {
      const thucXuat = parseFloat(newItems[index].thucXuat) || 0;
      const donGia = parseFloat(newItems[index].donGia) || 0;
      newItems[index].thanhTien = (thucXuat * donGia).toString();
    }

    setItems(newItems);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        stt: "",
        tenNhanHieu: "",
        donViTinh: "",
        yeuCau: "",
        thucXuat: "",
        donGia: "",
        thanhTien: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (items.length > 2 && index > 0) {
      // Keep at least header row + 1 data row
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleExport = () => {
    exportToPDF("phieu-xuat-kho-form", "Phieu_Xuat_Kho");
  };

  return (
    <div className="form-container">
      <div id="phieu-xuat-kho-form">
        <div className="form-header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={logoImg}
                alt="Logo"
                style={{
                  maxWidth: "100px",
                  height: "auto",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    letterSpacing: "0.5px",
                  }}
                >
                  CLB CẤP CỨU
                </h3>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    letterSpacing: "0.5px",
                  }}
                >
                  NGOẠI VIỆN - PMC
                </h3>
              </div>
            </div>
            <div style={{ textAlign: "right", flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                Mẫu số 04 - VT
              </h2>
              <p style={{ margin: 0, fontSize: "11px", fontStyle: "italic" }}>
                (Ban hành kèm theo Thông tư số 88/2021/TT-BTC
              </p>
              <p style={{ margin: 0, fontSize: "11px", fontStyle: "italic" }}>
                ngày 11 tháng 10 năm 2021 của Bộ trưởng
              </p>
              <p style={{ margin: 0, fontSize: "11px", fontStyle: "italic" }}>
                Bộ Tài chính)
              </p>
            </div>
          </div>

          <h2
            style={{
              fontSize: "24px",
              margin: "1.5rem 0",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            PHIẾU XUẤT KHO
          </h2>

          <div
            style={{
              textAlign: "center",
              fontSize: "13px",
              marginBottom: "1rem",
            }}
          >
            <p style={{ margin: "5px 0" }}>
              Ngày
              <input
                type="text"
                name="ngay"
                value={formData.ngay}
                onChange={handleChange}
                style={{ width: "40px", margin: "0 5px" }}
              />
              tháng
              <input
                type="text"
                name="thang"
                value={formData.thang}
                onChange={handleChange}
                style={{ width: "40px", margin: "0 5px" }}
              />
              năm
              <input
                type="text"
                name="nam"
                value={formData.nam}
                onChange={handleChange}
                style={{ width: "60px", margin: "0 5px" }}
              />
            </p>
          </div>
        </div>

        <div className="form-section">
          <p style={{ fontSize: "13px", marginBottom: "8px" }}>
            - Họ và tên người nhận hàng:
            <input
              type="text"
              name="nguoiNhan"
              value={formData.nguoiNhan}
              onChange={handleChange}
              style={{ width: "calc(100% - 250px)", marginLeft: "5px" }}
            />
          </p>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th rowSpan="2" style={{ width: "40px" }}>
                  STT
                </th>
                <th rowSpan="2" style={{ minWidth: "150px" }}>
                  Tên, nhãn hiệu, quy cách, phẩm chất vật liệu, dụng cụ, sản
                  phẩm, hàng hoá
                </th>
                <th rowSpan="2" style={{ width: "70px" }}>
                  Đơn vị tính
                </th>
                <th colSpan="2">Số lượng</th>
                <th rowSpan="2" style={{ width: "80px" }}>
                  Đơn giá
                </th>
                <th rowSpan="2" style={{ width: "90px" }}>
                  Thành tiền
                </th>
                <th rowSpan="2" style={{ width: "70px" }}>
                  Xóa
                </th>
              </tr>
              <tr>
                <th style={{ width: "70px" }}>Yêu cầu</th>
                <th style={{ width: "70px" }}>Thực xuất</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.stt}
                      onChange={(e) =>
                        handleItemChange(index, "stt", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      value={item.tenNhanHieu}
                      onChange={(e) =>
                        handleItemChange(index, "tenNhanHieu", e.target.value)
                      }
                      rows="2"
                      style={{ textAlign: "left" }}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={item.donViTinh}
                      onChange={(e) =>
                        handleItemChange(index, "donViTinh", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.yeuCau}
                      onChange={(e) =>
                        handleItemChange(index, "yeuCau", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.thucXuat}
                      onChange={(e) =>
                        handleItemChange(index, "thucXuat", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.donGia}
                      onChange={(e) =>
                        handleItemChange(index, "donGia", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.thanhTien}
                      onChange={(e) =>
                        handleItemChange(index, "thanhTien", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {index > 0 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeRow(index)}
                      >
                        Xóa
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Cộng
                </td>
                <td>x</td>
                <td>x</td>
                <td>x</td>
                <td>x</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-actions">
          <button className="btn btn-secondary" onClick={addRow}>
            ➕ Thêm dòng
          </button>
        </div>

        <div className="signature-section">
          <div className="signature-box">
            <h4>THỦ KHO</h4>
            <p>(Ký, họ tên)</p>
            <input
              type="text"
              placeholder="Nhập họ tên"
              style={{
                width: "100%",
                marginTop: "60px",
                padding: "0.3rem",
                border: "none",
                borderBottom: "1px solid black",
                textAlign: "center",
                background: "transparent",
                fontSize: "0.9rem",
              }}
            />
          </div>
          <div className="signature-box">
            <h4>NGƯỜI LẬP BIỂU</h4>
            <p>(Ký, họ tên)</p>
            <input
              type="text"
              placeholder="Nhập họ tên"
              style={{
                width: "100%",
                marginTop: "60px",
                padding: "0.3rem",
                border: "none",
                borderBottom: "1px solid black",
                textAlign: "center",
                background: "transparent",
                fontSize: "0.9rem",
              }}
            />
          </div>
        </div>
      </div>

      <div className="export-section">
        <button className="btn btn-primary" onClick={handleExport}>
          📥 Tải xuống PDF
        </button>
      </div>
    </div>
  );
}

export default PhieuXuatKho;

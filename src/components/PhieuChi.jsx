import { useState } from "react";
import { exportToPDF } from "../utils/pdfExport";
import logoImg from "../assets/logo.png";

function PhieuChi() {
  const [formData, setFormData] = useState({
    hoTenDonVi: "",
    diaChiDonVi: "",
    quyenSo: "",
    so: "",
    ngay: "",
    thang: "",
    nam: "",
    nguoiNhan: "",
    diaChiNguoiNhan: "",
    lyDoChi: "",
    soTien: "",
    soTienChu: "",
    kemTheo: "",
    ngayChungTu: "",
    thangChungTu: "",
    namChungTu: "",
    soTienChuCuoi: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExport = () => {
    exportToPDF("phieu-chi-form", "Phieu_Chi");
  };

  return (
    <div className="form-container">
      <div id="phieu-chi-form">
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
                Mẫu số 02 - TT
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
            PHIẾU CHI
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <span>
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
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0 }}>
                Quyền số:
                <input
                  type="text"
                  name="quyenSo"
                  value={formData.quyenSo}
                  onChange={handleChange}
                  style={{ width: "80px", marginLeft: "5px" }}
                />
              </p>
              <p style={{ margin: 0 }}>
                Số:
                <input
                  type="text"
                  name="so"
                  value={formData.so}
                  onChange={handleChange}
                  style={{ width: "100px", marginLeft: "5px" }}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <p style={{ fontSize: "13px", marginBottom: "10px" }}>
            - Họ và tên người nhận tiền:
            <input
              type="text"
              name="nguoiNhan"
              value={formData.nguoiNhan}
              onChange={handleChange}
              style={{ width: "calc(100% - 220px)", marginLeft: "5px" }}
            />
          </p>

          <p style={{ fontSize: "13px", marginBottom: "10px" }}>
            - Địa chỉ:
            <input
              type="text"
              name="diaChiNguoiNhan"
              value={formData.diaChiNguoiNhan}
              onChange={handleChange}
              style={{ width: "calc(100% - 100px)", marginLeft: "5px" }}
            />
          </p>

          <p style={{ fontSize: "13px", marginBottom: "10px" }}>
            - Lý do chi:
            <input
              type="text"
              name="lyDoChi"
              value={formData.lyDoChi}
              onChange={handleChange}
              style={{ width: "calc(100% - 100px)", marginLeft: "5px" }}
            />
          </p>

          <p style={{ fontSize: "13px", marginBottom: "10px" }}>
            - Số tiền:
            <input
              type="text"
              name="soTien"
              value={formData.soTien}
              onChange={handleChange}
              style={{ width: "300px", marginLeft: "5px" }}
            />
          </p>

          <p style={{ fontSize: "13px", marginBottom: "5px" }}>
            - Số tiền (Viết bằng chữ):
          </p>
          <textarea
            name="soTienChu"
            value={formData.soTienChu}
            onChange={handleChange}
            rows="2"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px dotted black",
              background: "transparent",
              resize: "vertical",
              minHeight: "50px",
              fontSize: "0.95rem",
              lineHeight: "1.4",
            }}
          />

          <div
            style={{
              borderTop: "1px dotted black",
              paddingTop: "10px",
              marginTop: "15px",
            }}
          ></div>

          <p
            style={{
              fontSize: "13px",
              marginBottom: "10px",
              marginTop: "15px",
            }}
          >
            - Kèm theo:
            <input
              type="text"
              name="kemTheo"
              value={formData.kemTheo}
              onChange={handleChange}
              style={{ width: "calc(100% - 500px)", marginLeft: "5px" }}
            />
            Chứng từ gốc: Ngày
            <input
              type="text"
              name="ngayChungTu"
              value={formData.ngayChungTu}
              onChange={handleChange}
              style={{ width: "40px", margin: "0 5px" }}
            />
            tháng
            <input
              type="text"
              name="thangChungTu"
              value={formData.thangChungTu}
              onChange={handleChange}
              style={{ width: "40px", margin: "0 5px" }}
            />
            năm
            <input
              type="text"
              name="namChungTu"
              value={formData.namChungTu}
              onChange={handleChange}
              style={{ width: "60px", margin: "0 5px" }}
            />
          </p>
        </div>

        <div className="signature-section">
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
          <div className="signature-box">
            <h4>THỦ QUỸ</h4>
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

        <div style={{ marginTop: "2rem" }}>
          <p style={{ fontSize: "13px", marginBottom: "5px" }}>
            Đã nhận đủ số tiền (viết bằng chữ):
          </p>
          <textarea
            name="soTienChuCuoi"
            value={formData.soTienChuCuoi}
            onChange={handleChange}
            rows="2"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px dotted black",
              background: "transparent",
              resize: "vertical",
              minHeight: "50px",
              fontSize: "0.95rem",
              lineHeight: "1.4",
            }}
          />
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

export default PhieuChi;

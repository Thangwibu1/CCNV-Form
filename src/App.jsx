import { useState } from "react";
import "./App.css";
import PhieuThu from "./components/PhieuThu";
import PhieuChi from "./components/PhieuChi";
import PhieuNhapKho from "./components/PhieuNhapKho";
import PhieuXuatKho from "./components/PhieuXuatKho";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "Phiếu Thu", component: PhieuThu },
    { id: 1, name: "Phiếu Chi", component: PhieuChi },
    { id: 2, name: "Phiếu Nhập Kho", component: PhieuNhapKho },
    { id: 3, name: "Phiếu Xuất Kho", component: PhieuXuatKho },
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="app">
      <div className="header">
        <h1>Hệ Thống Quản Lý Phiếu</h1>
        <p>Quản lý các phiếu thu, chi, nhập kho và xuất kho</p>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="content">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App;

// Reusable Input Components for Forms

export const FormInput = ({
  label,
  name,
  value,
  onChange,
  width = "calc(100% - 200px)",
  ...props
}) => (
  <p style={{ fontSize: "13px", marginBottom: "10px" }}>
    {label}
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      style={{ width, marginLeft: "5px" }}
      {...props}
    />
  </p>
);

export const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  rows = 2,
  ...props
}) => (
  <>
    <p style={{ fontSize: "13px", marginBottom: "5px" }}>{label}</p>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
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
      {...props}
    />
  </>
);

export const InlineInput = ({ name, value, onChange, width, ...props }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    style={{ width, margin: "0 5px" }}
    {...props}
  />
);

export const DateInputGroup = ({ ngay, thang, nam, onChange }) => (
  <span>
    Ngày
    <InlineInput name="ngay" value={ngay} onChange={onChange} width="40px" />
    tháng
    <InlineInput name="thang" value={thang} onChange={onChange} width="40px" />
    năm
    <InlineInput name="nam" value={nam} onChange={onChange} width="60px" />
  </span>
);

export const SignatureBox = ({ title, subtitle, note }) => (
  <div className="signature-box">
    <h4>{title}</h4>
    {subtitle && <h4>{subtitle}</h4>}
    <p>{note}</p>
  </div>
);

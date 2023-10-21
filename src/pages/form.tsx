export default function form() {
  const onUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);

    await fetch("/api/form", { method: "POST", body: formData });
  };
  return (
    <div>
      <input type={"file"} onChange={(e) => onUploadFile(e.target.files)} />
    </div>
      );
}

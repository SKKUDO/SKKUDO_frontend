import styled from "styled-components";

const Title = styled("div")({
  color: "#000069",
  fontSize: "35px",
  marginLeft: "40px",
  fontWeight: "600",
  marginBottom: "40px",
});

interface FormTitleType {
  title: string;
}
function FormTitle({ title }: FormTitleType) {
  return (
    <>
      <Title>{title}</Title>
    </>
  );
}

export default FormTitle;

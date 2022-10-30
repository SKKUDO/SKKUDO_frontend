import styled from "styled-components";

const Title = styled("div")({
  color: "#0c4426",
  fontSize: "2.5rem",
  marginLeft: "40px",
  fontWeight: "600",
  marginBottom: "40px",
});

interface FormTitleType {
  title: string;
}
function FormTitle({ title }: FormTitleType) {
  return <Title>{title}</Title>;
}

export default FormTitle;

import styled from "styled-components";

export const Head = styled.header`
  background-color: #c95454;
`;

export const SelectArea = styled.div`
  width: 35%;

  .select-area {
    width: 100%;
  }

  .text-area {
    width: 52%;
  }

  select.form-select:focus {
    border-color: #3c3c3c !important;
    box-shadow: 0 0 0 0.25rem rgb(0 0 0 / 25%) !important;
  }
`;

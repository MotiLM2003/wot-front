import Button from "../components/Tests/Button/Button";
export default { title: "Button", component: Button };

const template = (args) => <Button {...args} />;

export const Red = () => template.bind({});

Red.args = {
  label: "Hello there",
};

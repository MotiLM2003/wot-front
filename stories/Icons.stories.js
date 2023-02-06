import Account from "../components/icons/AccountIcon";
export default { title: "Icons", component: Account };

const template = (args) => <Account {...args} />;

export const Red = () => template.bind({});

Red.args = {
  label: "Hello there",
};

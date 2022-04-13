const { createContext, useState } = require("react");

const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(
		sessionStorage.getItem("user")
			? JSON.parse(sessionStorage.getItem("user"))
			: null
	);

	return (
		<UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserInfoContext.Provider>
	);
};

export default UserInfoContext;

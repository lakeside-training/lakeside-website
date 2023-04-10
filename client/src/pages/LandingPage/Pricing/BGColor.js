import React from "react";

const BGColor = () => {
	return (
		<div className="absolute -inset-4">
			<div
				className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
				style={{
					background:
						"linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
				}}
			></div>
		</div>
	);
};

export default BGColor;

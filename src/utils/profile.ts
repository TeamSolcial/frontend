export const getAvatarUrl = (address: string) => {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`;
};

export const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

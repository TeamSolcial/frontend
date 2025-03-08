export interface Table {
    publicKey: string;
    account: {
        organizer: string;
        title: string;
        description: string;
        maxSeats: number;
        currentSeats: number;
        country: string;
        city: string;
        location: string;
        price: number;
        date: number;
        category: string;
        imageUrl: string;
    };
}
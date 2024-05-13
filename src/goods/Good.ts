type Delivery = {
    option: string;
    description: string;
    extra: string | null;
};

type PhotoCreation = {
    file: File;
    gender: string;
};

type Category = {
    name: string;
    gender: "MALE" | "FEMALE";
};

type UnisexCategory = {
    gender: "UNISEX";
    name: string;
    nameForMen: string;
    nameForWomen: string;
};

type Good = {
    pk?: number;
    categoryName: string;
    goodName: string;
    price: number;
    description: string;
    colors: string[];
    sizes: string[];
    features: string[];
    material: string;
    fabricCares: string[];
    deliveryAndReturn: Delivery[];
    photos: string[];
    matchWith?: number[];
};

type GoodCreation = {
    category: Category | UnisexCategory;
    goodName: string;
    price: number;
    description: string;
    colors: string[];
    sizes: string[];
    features: string[];
    material: string;
    fabricCares: string[];
    deliveryAndReturn?: Delivery[];
    photos: PhotoCreation[];
};

export type { Good, PhotoCreation, GoodCreation, Category, UnisexCategory };

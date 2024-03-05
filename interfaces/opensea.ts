interface IAssetContract {
    name: string;
    created_date: string;
    description: string;
    image_url: string;
    owner: number;
    schema_name: string;
    symbol: string;
}

interface ICollection {
    banner_image_url: string;
    created_date: string;
}

export interface IRarity {
    strategy_id: string;
    calculated_at: string;
    rank: number;
    score: number;
    max_rank: number;
}

interface IPaymentToken {
    address: string;
    decimals: number;
    image_url: string;
    name: string;
    symbol: string;
    use_price: string
}

interface IAccount {
    address: string;
    config: string;
    profile_img_url: string;
    user: {
        username: string;
    }
}

interface ITransaction {
    block_hash: string;
    block_number: string;
    from_account: IAccount;
    id: number;
    timestamp: string;
    to_account: IAccount;
    transaction_hash: string;
}


interface ILastSale {
    event_timestamp: string;
    event_type: string;
    quantity: string;
    total_price: string;
    payment_token: IPaymentToken;
    transaction: ITransaction;
}

interface IOwnership {
    owner: IAccount;
    quantity: string;
    created_date: string;
}


export interface ITrait {
    trait_type: string;
    max_value: string | null;
    order: number | null;
    trait_count: number;
    display_type: string | null;
    value: string;
}

export interface IOpenSeaAsset {
    id: number;
    token_id: string;
    name: string;
    description: string;
    asset_contract: IAssetContract;
    collection: ICollection;
    last_sale: ILastSale;
    num_sales: number;
    permalink: string;
    rarity_data: IRarity;
    traits: ITrait[];
    top_ownerships: IOwnership[];
}
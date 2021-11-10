import internal = require("assert");


export enum ItemType {
    COMMON,
    INDEFECTIBLE,
    PERISHABLE,
    CONJURED
}

export abstract class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    protected abstract decreaseSellIn(): void;
    protected abstract changeQuality(): void;

    updateQuality(): void {
        this.decreaseSellIn();
        this.changeQuality();
    }

}

export class CommonItem extends Item {
    quality_change_speed: number = -1;

    decreaseSellIn(): void {
        if ( !this.sellIn ) {
            console.log(`Item '${this.name}'' expired`);
            this.quality_change_speed *= 2;
            return;
        }

        this.sellIn -= 1;
    }
    changeQuality(): void {
        if ( !this.quality ) {
            console.log(`Item '${this.name}'' has gone...`);
            return;
        }

        this.quality += this.quality_change_speed;
    }
    
}

export class IndefectibleItem extends Item {
    decreaseSellIn(): void {
        console.log(`${this.name} stands still`);
    }
    changeQuality(): void {
        console.log(`${this.name} stands still`);
    }

}

export class PerishableItem extends CommonItem {
    quality_change_speed: number = 1;

    decreaseSellIn(): void {
        switch (true) {
            case !this.sellIn:
                console.log(`Item '${this.name}'' expired`)
                this.quality_change_speed = -this.quality;
                return;
            case this.sellIn <= 10 && this.sellIn > 5:
                this.quality_change_speed = 2;
                break;
            case this.sellIn <= 5 && this.sellIn > 0:
                this.quality_change_speed = 3;
                break;
            default:
                break;
        }

        this.sellIn -= 1;
    }
}

export class ConjuredItem extends CommonItem {
    quality_change_speed: number = -2;
}

export class ItemFactory {
    createItem(itemType: ItemType, itemName: string, itemSellIn: number, itemQuality: number): Item {
        

        switch (itemType) {
            case ItemType.COMMON:
                return new CommonItem(itemName, itemSellIn, itemQuality);
            case ItemType.INDEFECTIBLE:
                return  new IndefectibleItem(itemName, itemSellIn, itemQuality);
            case ItemType.PERISHABLE:
                return new PerishableItem(itemName, itemSellIn, itemQuality);
            case ItemType.CONJURED:
                return new ConjuredItem(itemName, itemSellIn, itemQuality);
            default:
                throw new Error("Unknown item type")
        }
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => item.updateQuality());
    }
}

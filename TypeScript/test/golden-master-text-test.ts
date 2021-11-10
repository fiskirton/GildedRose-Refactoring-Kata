import { GildedRose, ItemFactory, ItemType } from '../app/gilded-rose';

const itemFactory: ItemFactory = new ItemFactory();

const items = [
    itemFactory.createItem(ItemType.COMMON, "+5 Dexterity Vest", 10, 20), //
    itemFactory.createItem(ItemType.PERISHABLE, "Aged Brie", 2, 0), //
    itemFactory.createItem(ItemType.PERISHABLE, "Elixir of the Mongoose", 5, 7), //
    itemFactory.createItem(ItemType.INDEFECTIBLE, "Sulfuras, Hand of Ragnaros", 0, 80), //
    itemFactory.createItem(ItemType.INDEFECTIBLE, "Sulfuras, Hand of Ragnaros", -1, 80),
    itemFactory.createItem(ItemType.PERISHABLE, "Backstage passes to a TAFKAL80ETC concert", 15, 20),
    itemFactory.createItem(ItemType.PERISHABLE, "Backstage passes to a TAFKAL80ETC concert", 10, 49),
    itemFactory.createItem(ItemType.PERISHABLE, "Backstage passes to a TAFKAL80ETC concert", 5, 49),
    // this conjured item does not work properly yet
    itemFactory.createItem(ItemType.CONJURED, "Conjured Mana Cake", 3, 6)
];


const gildedRose = new GildedRose(items);
var days: number = 2;
for (let i = 0; i < days; i++) {
    console.log("-------- day " + i + " --------");
    console.log("name, sellIn, quality");
    items.forEach(element => {
        console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);

    });
    console.log();
    gildedRose.updateQuality();
}
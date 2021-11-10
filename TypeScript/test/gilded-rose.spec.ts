import { expect } from 'chai';
import { ItemFactory, ItemType, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const itemFactory = new ItemFactory()
        const gildedRose = new GildedRose([ itemFactory.createItem(ItemType.COMMON, 'foo', 0, 0) ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].name).to.equal('foo');
    });

});

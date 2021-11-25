import Helper from "./Helper";

class ChartHelper {

    constructor(time, items) {
        this.time = time;
        this.items = items;
        this.timelineLength = this.getTimelineLength()
    }

    groupItemByMinutes() {
        const obj = {};
        if (this.time < 24) {
            let prev;
            let gas = 1;
            let flame = 1;
            this.items.forEach(item => {
                const d = new Date(item.date);
                d.setSeconds(0);
                d.setMilliseconds(0);
                const key = d.toISOString();
                if (!obj[key]) {
                    // new hour
                    if (!!prev) {
                        obj[prev].gas = gas;
                        obj[prev].flame = flame;
                    }
                    obj[key] = { gas, flame }
                    gas = 1;
                    flame = 1;
                    prev = key;
                } else {
                    // old hour
                    if (item.gas === 0) gas = 0;
                    if (item.flame === 0) flame = 0;
                }
            })
        }
        return obj;
    }
    groupItemsByHour() {
        const obj = {};
        if (this.time >= 24) {
            let prev;
            let gas = 1;
            let flame = 1;
            this.items.forEach(item => {
                const d = new Date(item.date);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                const key = d.toISOString();
                if (!obj[key]) {
                    // new hour
                    if (!!prev) {
                        obj[prev].gas = gas;
                        obj[prev].flame = flame;
                    }
                    obj[key] = { gas, flame }
                    gas = 1;
                    flame = 1;
                    prev = key;
                } else {
                    // old hour
                    if (item.gas === 0) gas = 0;
                    if (item.flame === 0) flame = 0;
                }
            })
        }
        return obj;
    }

    genData(items) {
        const { gasData, flameData, labels } = this.genDefaultData(this.time);
        const itemsIndexes = this.getTimelineIndexes(items);
        console.log('indexes', itemsIndexes)

        let i = 0;
        if (this.time < 24) {
            // const groupTime = this.groupItemByMinutes();
            // for (let time in groupTime) {
            //     const item = {
            //         ...groupTime[time],
            //         date: time,
            //     };
            //     const idx = itemsIndexes[i];
            //     gasData[idx] = ChartHelper.getStatus(item, 'gas');
            //     flameData[idx] = ChartHelper.getStatus(item, 'flame');;
            //     labels[idx] = ChartHelper.getLabel(item, this.time);
            //     i++;
            // }
            for (let idx of itemsIndexes) {
                const item = items[i];
                gasData[idx] = ChartHelper.getStatus(item, 'gas');
                flameData[idx] = ChartHelper.getStatus(item, 'flame');;
                labels[idx] = ChartHelper.getLabel(item, this.time);
                i++;
            }
        } else {
            const groupTime = this.groupItemsByHour();
            for (let time in groupTime) {
                const item = {
                    ...groupTime[time],
                    date: time,
                };
                const idx = itemsIndexes[i];
                console.log('index', idx)
                gasData[idx] = ChartHelper.getStatus(item, 'gas');
                flameData[idx] = ChartHelper.getStatus(item, 'flame');;
                labels[idx] = ChartHelper.getLabel(item, time);
                i++;
            }
        }
        return { gasData, flameData, labels };
    }

    genDefaultData() {
        return ChartHelper.genDefaultData(this.time);
    }

    getTimelineLength() {
        return ChartHelper.getTimelineLength(this.time);
    }


    //
    static getStatus(item, field) {
        return item[field] === 1 ? 0 : 1;
    }

    static getLabel(item, chartTimeInHour) {
        const date = new Date(item.date);
        const M = Helper.strPad(date.getMonth() + 1, 2, '0');
        const d = Helper.strPad(date.getDate(), 2, '0');
        const h = Helper.strPad(date.getHours(), 2, '0');
        const m = Helper.strPad(date.getMinutes(), 2, '0');
        if (chartTimeInHour <= 24) {
            return `${h}:${m}`;
        } else {
            return `${d}/${M} ${h}:${m}`;
        }
    }

    static getFetchTime(h) {
        const d = new Date();
        d.setHours(d.getHours() - h);
        return d.toISOString();
    }

    static genDefaultData(time) {
        //
        const timelineLength = ChartHelper.getTimelineLength(time);
        const defaultData = [...Array(timelineLength)].map(_ => 0);
        const gasData = defaultData.slice(0);
        const flameData = defaultData.slice(0);
        const labels = defaultData.slice(0).map((item, index) => {
            const d = new Date();
            if (time < 24) {
                d.setMinutes(d.getMinutes() - (timelineLength - index))
            } else {
                d.setHours(d.getHours() - (timelineLength - index))
            }
            return this.getLabel({
                date: d,
            }, time)
        })
        return {
            gasData, flameData, labels
        }
    }

    // UPDATE 
    static getTimelineLength(time) {
        let length = time < 24 ? time * 60 : time;
        return length;
    }

    diffTime(date) {
        let t = this.time >= 24 ? 1000 * 60 : 1000 * 60 * 60;
        return Math.ceil(Math.abs(new Date() - date) / t);
    }


    getTimelineIndex(item) {
        const index = this.timelineLength - this.diffTime(new Date(item.date));
        return index;
    }

    getTimelineIndexes(items) {
        const indexCount = {}
        items.forEach(item => {
            const index = this.getTimelineIndex(item)
            indexCount[index] = indexCount[index] + 1 || 1;
        });
        const indexes = Object.keys(indexCount);
        return indexes;
    }
}
export default ChartHelper;
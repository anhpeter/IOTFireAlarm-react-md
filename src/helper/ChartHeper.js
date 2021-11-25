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
                if (item.gas === 0) gas = 0;
                if (item.flame === 0) flame = 0;

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
            this.items.forEach((item, index) => {
                const d = new Date(item.date);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                const key = d.toISOString();
                // old hour
                if (item.gas === 0) gas = 0;
                if (item.flame === 0) flame = 0;
                if (!obj[key] || this.items.length - 1 === index) {
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
                }
            })
        }
        return obj;
    }

    genData(items) {
        const { gasData, flameData, labels } = this.genDefaultData(this.time);

        let i = 0;
        if (this.time < 24) {
            const groupTime = this.groupItemByMinutes();
            const itemsIndexes = this.getMinuteIndexes(groupTime);
            console.log('gr', groupTime, itemsIndexes)
            for (let time in groupTime) {
                const item = {
                    ...groupTime[time],
                    date: time,
                };
                const idx = itemsIndexes[i];
                const gas = ChartHelper.getStatus(item, 'gas');
                const flame = ChartHelper.getStatus(item, 'flame')
                gasData[idx] = gas;
                flameData[idx] = flame;
                labels[idx] = ChartHelper.getLabel(item, this.time);
                i++;
            }
            console.log('gas data', gasData);
            console.log('flame data', flameData)
        } else {
            const groupTime = this.groupItemsByHour();
            const itemsIndexes = this.getIndexes(groupTime);
            console.log('gr', groupTime, itemsIndexes)
            for (let time in groupTime) {
                const item = {
                    ...groupTime[time],
                    date: time,
                };
                const idx = itemsIndexes[i];
                const gas = ChartHelper.getStatus(item, 'gas');
                const flame = ChartHelper.getStatus(item, 'flame')
                gasData[idx] = gas;
                flameData[idx] = flame;
                labels[idx] = ChartHelper.getLabel(item, time);
                i++;
            }
        }
        return { gasData, flameData, labels };
    }

    getMinuteIndexes(groupTime) {
        const result = [];
        for (let time in groupTime) {
            let t = 1000 * 60;
            const d = Math.abs(new Date() - new Date(time));
            const diff = Math.ceil(d / t);
            const index = this.timelineLength - diff;
            result.push(index);
        }
        return result;
    }

    getIndexes(groupTime) {
        const result = [];
        for (let time in groupTime) {
            let t = 1000 * 60 * 60;
            const d = Math.abs(new Date() - new Date(time));
            const diff = Math.ceil(d / t);
            const index = this.timelineLength - diff;
            result.push(index);
        }
        return result;
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
        if (chartTimeInHour < 24) {
            return `${h}:${m}`;
        } else {
            return `${d}/${M} ${h}:${m}`;
        }
    }

    static getFetchTime(chartTimeInHour) {
        const d = new Date();
        const h = d.getHours();
        if (chartTimeInHour === 1) {
            d.setHours(h - chartTimeInHour);
        } else {
            d.setHours(h - chartTimeInHour);
        }
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
                d.setMinutes(d.getMinutes() - (timelineLength - index) + 1)
            } else {
                d.setHours(d.getHours() - (timelineLength - index) + 1)
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
        let t = 1000 * 60;
        const d = Math.abs(new Date() - date);
        return Math.ceil(d / t);
    }

    getTimelineIndex(item) {
        const diff = this.diffTime(new Date(item.date))
        const index = this.timelineLength - diff;
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
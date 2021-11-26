import Helper from "./Helper";

class ChartHelper {

    constructor(time, items) {
        this.time = time;
        this.items = items;
        this.timelineLength = this.getTimelineLength()
    }

    // GEN
    genData() {
        const { gasData, flameData, labels } = this.genDefaultData(this.time);

        let i = 0;
        const groupStatus = this.groupStatus();
        const timelineIndexes = this.getTimelineIndexesForNewStatuses(groupStatus);
        for (let time in groupStatus) {
            const item = {
                ...groupStatus[time],
                date: time,
            };
            const idx = timelineIndexes[i];
            gasData[idx] = ChartHelper.getStatus(item, 'gas');
            flameData[idx] = ChartHelper.getStatus(item, 'flame')
            labels[idx] = ChartHelper.getLabel(item, this.time);
            i++;
        }
        return { gasData, flameData, labels };
    }

    genDefaultData() {
        return ChartHelper.genDefaultData(this.time);
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

    // GROUP STATUSES
    getGroupStatusKey(dateStr) {
        const d = new Date(dateStr);
        if (this.time >= 24) {
            d.setMinutes(0);
        }
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
    }

    groupStatus() {
        const obj = {};
        if (this.items.length > 0) {
            let gas = 1;
            let flame = 1;
            let prev = this.getGroupStatusKey(this.items[0].date);
            this.items.forEach((item, index) => {

                // set values
                const isLastItem = this.items.length - 1 === index;
                const key = this.getGroupStatusKey(item.date);
                if (!obj[key]) {
                    // new timestamp or last item
                    if (!!prev) {
                        // update prev 
                        obj[prev] = {
                            gas, flame
                        }
                    }
                    // set 
                    gas = 1;
                    flame = 1;
                    prev = key;
                }
                if (item.gas === 0) gas = 0;
                if (item.flame === 0) flame = 0;

                // last item
                if (isLastItem) { obj[key] = { gas, flame } };
            })
        }
        return obj;
    }

    // HELPER METHODS
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
    getTimelineLength() {
        return ChartHelper.getTimelineLength(this.time);
    }

    getTimelineIndexesForNewStatuses(groupTime) {
        const result = [];
        for (let time in groupTime) {
            let t = this.time < 24 ? 1000 * 60 : 1000 * 60 * 60;
            const d = Math.abs(new Date() - new Date(time));
            const diff = Math.ceil(d / t);
            const index = this.timelineLength - diff;
            result.push(index);
        }
        return result;
    }

    static getTimelineLength(time) {
        let length = time < 24 ? time * 60 : time;
        return length;
    }
}
export default ChartHelper;
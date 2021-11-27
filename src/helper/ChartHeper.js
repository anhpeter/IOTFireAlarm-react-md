import { LAST_REALTIME_QTY } from "../constants/app_constant";
import Helper from "./Helper";

class ChartHelper {

    constructor(time, items) {
        this.time = time;
        this.items = items;
        this.timelineLength = this.getTimelineLength()
    }

    // GEN
    genData() {
        if (this.time > -1) {
            const { gasData, flameData, labels } = this.genDefaultData();

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
        } else {
            const gasData = this.items.map(item => ChartHelper.getStatus(item, 'gas'));
            const flameData = this.items.map(item => ChartHelper.getStatus(item, 'flame'));
            const labels = this.items.map(item => ChartHelper.getLabel(item, this.time));
            return { gasData, flameData, labels };
        }
    }

    genDefaultData() {
        return ChartHelper.genDefaultData(this.time);
    }

    static genDefaultData(time) {
        let gasData, flameData, labels;
        //
        const timelineLength = time > -1 ? ChartHelper.getTimelineLength(time) : LAST_REALTIME_QTY;
        const defaultData = [...Array(timelineLength)].map(_ => 0);
        gasData = defaultData.slice(0);
        flameData = defaultData.slice(0);
        labels = ChartHelper.genDefaultLabels(timelineLength, time);
        return { gasData, flameData, labels }
    }

    static genDefaultLabels(length, time) {
        const labels = [...Array(length)].map((_, index) => {
            const d = new Date();
            if (time < 24) {
                d.setMinutes(d.getMinutes() - (length - index) + 1)
            } else if (time < 720) {
                d.setHours(d.getHours() - (length - index) + 1)
            } else {
                d.setDate(d.getDate() - (length - index) + 1)
            }
            return this.getLabel({
                date: d,
            }, time)
        })
        return labels;
    }

    // GROUP STATUSES
    getGroupStatusKey(dateStr) {
        const d = new Date(dateStr);
        if (this.time >= 24) {
            d.setMinutes(0);
            if (this.time >= 720) {
                d.setHours(0);
            }
        }
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toString();
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
                    obj[key] = true;
                }

                //
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
        if (chartTimeInHour < 24) return `${h}:${m}`;
        if (chartTimeInHour >= 720) return `${d}/${M}`
        return `${d}/${M} ${h}:${m}`;
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
            let t = 1000 * 60;
            if (this.time >= 24) {
                t *= 60;
                if (this.time >= 720) t *= 24;
            }
            const d = Math.abs(new Date() - new Date(time));
            const diff = Math.ceil(d / t);
            const index = this.timelineLength - diff;
            result.push(index);
        }
        return result;
    }

    static getTimelineLength(time) {
        if (time < 24) return time * 60;
        if (time >= 720) return Math.ceil(time / 24);
        return time;
    }
}
export default ChartHelper;
import Helper from "./Helper";

class ChartHelper {

    constructor(time) {
        this.time = time;
        this.timelineLength = this.getTimelineLength()
    }

    genData(items) {
        const { gasData, flameData, labels } = this.genDefaultData(this.time);
        const itemsIndexes = this.getTimelineIndexes(items);
        items.forEach((item, index) => {
            gasData[itemsIndexes[index]] = ChartHelper.getStatus(item, 'gas');
            flameData[itemsIndexes[index]] = ChartHelper.getStatus(item, 'flame');
            labels[itemsIndexes[index]] = ChartHelper.getLabel(item, this.time);
        })
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
        return item[field] === 0 ? 1 : 0;
    }

    static getLabel(item, chartTimeInHour) {
        const date = new Date(item.date);
        const M = Helper.strPad(date.getMonth() + 1, 2, '0');
        const d = Helper.strPad(date.getDate(), 2, '0');
        const h = Helper.strPad(date.getHours(), 2, '0');
        const m = Helper.strPad(date.getMinutes(), 2, '0');
        if (chartTimeInHour < 24) {
            return `${h}:${m}`;
        } else if (chartTimeInHour === 24) {
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
        let t = this.chartTimeInHour >= 24 ? 1000 * 60 : 1000 * 60 * 60;
        return Math.ceil(Math.abs(new Date() - date) / t);
    }


    getTimelineIndex(item) {
        const index = this.timelineLength - this.diffTime(new Date(item.date));
        return index;
    }

    getTimelineIndexes(items) {
        const indexCount = {}
        items.forEach(item => {
            const index = this.getTimelineIndex(this.time, item)
            indexCount[index] = indexCount[index] + 1 || 1;
        });
        const indexes = Object.keys(indexCount);
        return indexes;
    }
}
export default ChartHelper;
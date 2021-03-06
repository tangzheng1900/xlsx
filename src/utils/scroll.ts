//判断滚动方向
let sLeft = 0,
    sTop = 0;
export function scrollToPosition(el): string {
    if (sLeft !== el.scrollLeft) {
        sLeft = el.scrollLeft;
        return 'horizontal';
    }
    if (sTop !== el.scrollTop) {
        sTop = el.scrollTop;
        return 'vertical';
    }
}
// 二分查找法
function binarySearch(offset: number, list: number[]): number {
    if (list.length === 0) {
        // console.error('数组为空');
        return 0;
    }
    let startIndex = 0,
        endIndex = list.length - 1,
        midIndex,
        startOffset,
        endOffset;
    while (startIndex <= endIndex) {
        midIndex = Math.floor((startIndex + endIndex) / 2);
        startOffset = list[midIndex - 1] || 0;
        endOffset = list[midIndex];
        //处理索引为0的情况
        if (midIndex === 0 && offset <= list[0]) {
            return 0;
        }
        if (startOffset > offset) {
            endIndex = midIndex - 1;
        } else if (startOffset === offset) {
            return midIndex - 1;
        } else if (startOffset <= offset && offset <= endOffset) {
            return midIndex;
        } else if (endOffset < offset) {
            startIndex = midIndex + 1;
        }
    }
    return list.length;
}

//查找开始位置
export function findStartIndex(offset: number, list: number[]): number {
    let top = 0;
    for (let index in list) {
        top += list[index];
        if (top > offset) {
            return Number(index);
        }
    }
}

//获取元素在表格的起始位置
export function getItemStartPosition(start: number, end: number, list: number[]): number {
    return list.slice(start, end).reduce((total, item) => {
        return total + item;
    }, 0);
}
// 获取当前表格的索引值，例如{start:0,end:10}
interface VisiblePosition {
    start: number;
    end: number;
}
export function findVisibleIndex(
    offset: number,
    visibleOffset: number,
    list: number[],
): VisiblePosition {
    let start = binarySearch(offset, list);
    let end = binarySearch(visibleOffset + offset, list);
    return {
        start: start,
        end: end,
    };
}

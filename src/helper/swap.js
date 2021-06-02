export default function swap(arr, clickedId, storedId) {
	let temp = arr[clickedId];
	arr[clickedId] = arr[storedId];
	arr[storedId] = temp;
	return arr;
}

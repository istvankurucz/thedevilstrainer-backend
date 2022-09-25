function sortById(doc1, doc2) {
	if (doc1.id < doc2.id) return -1;
	if (doc1.id > doc2.id) return 1;
	return 0;
}

export default sortById;

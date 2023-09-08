export function createDocsResponse(snapshot: any) {
	let docs: any = [];
	snapshot.docs.map((doc: any) => {
		docs.push(doc.data());
	});
	return docs;
}

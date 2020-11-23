export class IdDataService {
	private static instance: IdDataService;
	private static id = 0;

	public static getInstance() {
		if (!IdDataService.instance) {
			IdDataService.instance = new IdDataService();
		}

		return IdDataService.instance;
	}

	next = () => ++IdDataService.id;

	get = () => IdDataService.id;
}

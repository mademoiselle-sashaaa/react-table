export const mapData = (data: any) => {
    return data.map((item: any, i: number) => {
        let mappedItem = {
            id: item.id,
            keyword: item.keyword,
            color: item.color,
            positionInfo: item.position_info,
            totalApps: item.total_apps,
            usersPerDay: item.users_per_day,
            suggestionsCount: item.suggestions_count,
            selected: i === 0
        };

        return mappedItem;
    });
}
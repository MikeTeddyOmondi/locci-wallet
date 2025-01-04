"use client";

import { Flex, Grid, GridCol } from "@mantine/core";
import { BalanceCard } from "./BalanceCard";
// import { OverviewCard } from "./OverviewCard";
// import { ProfileCard } from "./ProfileCard";
// import { TransactionCard } from "./TransactionCard";
// import { WelcomeCard } from "./WelcomeCard";
import { StatsGroup } from "../StatsGroup";
import { mockData } from "../StatsGroup/mock";

interface Props {
	data: {
		stats: {
			title: string;
			value: string;
		}[];
	};
}

export function DashboardContent({ data: { stats } }: Props) {
	return (
		<Grid>
			{/* <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        <ProfileCard />
      </GridCol> */}
			<GridCol span={{ sm: 12, md: 12, lg: 12 }}>
				<Flex direction="column" h="100%" justify="space-between" gap="lg">
					{/* <WelcomeCard /> */}
					<StatsGroup data={stats} />
				</Flex>
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 12 }}>
				<BalanceCard />
			</GridCol>
			{/* <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        <OverviewCard />
      </GridCol> */}
			{/* <GridCol span={12}>
        <TransactionCard />
      </GridCol> */}
		</Grid>
	);
}

import { useTable, useNavigation } from "@refinedev/core";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Hourglass,
  Separator,
  Frame,
} from "react95";


export const ActivityList = () => {
  const { tableQueryResult } = useTable({
    resource: "categories",
  });

  const { edit } = useNavigation();

  return (
    <Window style={{ width: "100%" }}>
      <WindowHeader>My Progress</WindowHeader>
      <WindowContent>
        <Frame
          variant="inside"
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            padding: "1rem",
            width: "100%",
          }}
        >
          Total Points: 100
        </Frame>
        <Separator style={{
            marginBottom: "1rem",
            width: "100%",
        }}/>
        <Table>
          <TableHead>
            <TableRow>
            <TableHeadCell>Day</TableHeadCell>
              <TableHeadCell>Activity</TableHeadCell>
              <TableHeadCell>Points earned/deducted</TableHeadCell>
              <TableHeadCell>Details</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableQueryResult.data?.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableDataCell>{item.id}</TableDataCell>
                  <TableDataCell>{item.title}</TableDataCell>
                  <TableDataCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="sm"
                      onClick={() => {
                        edit("categories", item.id);
                      }}
                    >
                      View
                    </Button>
                  </TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {tableQueryResult.isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "350px",
            }}
          >
            <Hourglass size={32} />
          </div>
        )}
      </WindowContent>
    </Window>
  );
};

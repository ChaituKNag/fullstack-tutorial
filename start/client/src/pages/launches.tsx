import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client'
import * as GetLaunchListTypes from './__generated__/GetLaunchList';
import { Loading, Header, LaunchTile } from '../components';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;


export const GET_LAUNCHES = gql`
    query launchList($after: String) {
        launches(after: $after) {
            cursor
            hasMore
            launches {
                id
                isBooked
                rocket {
                    id
                    name
                }
                mission {
                    name
                    missionPatch
                }
            }
        }
    }
`;

interface LaunchesProps extends RouteComponentProps { }

const Launches: React.FC<LaunchesProps> = () => {
    const { data, loading, error, fetchMore } = useQuery<GetLaunchListTypes.GetLaunchList, GetLaunchListTypes.GetLaunchListVariables>(GET_LAUNCHES);

    if (loading) return <Loading />;
    if (error) return <p>Error</p>;
    if (!data) return <p>Not found</p>;

    return (
        <Fragment>
            <Header />
            {data.launches && data.launches.launches && data.launches.launches.map((launch: any) =>
                <LaunchTile key={launch.id} launch={launch} />
            )}
        </Fragment>
    );
}

export default Launches;

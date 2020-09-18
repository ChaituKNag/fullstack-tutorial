import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { LAUNCH_TILE_DATA } from './launches';
import * as GetMyTripsTypes from './__generated__/GetMyTrips';
import { Loading, Header, LaunchTile } from '../components';

interface ProfileProps extends RouteComponentProps {}

export const GET_MY_TRIPS = gql`
    ${LAUNCH_TILE_DATA}
    query GetMyTrips {
        me {
            id
            email
            trips {
                ...LaunchTile
            }
        }
    }
`

const Profile: React.FC<ProfileProps> = () => {
    const { data, loading, error } = useQuery<GetMyTripsTypes.GetMyTrips, any>(
        GET_MY_TRIPS,
        { fetchPolicy: "network-only"}
    );

    if(loading) return <Loading />;
    if(error) return <p>ERROR: {error.message}</p>;
    if(data===undefined) return <p>ERROR</p>;

    return (
        <Fragment>
            <Header>My Trips</Header>
            {data.me && data.me.trips.length ? (
                data.me.trips.map((launch: any) =>(
                    <LaunchTile key={launch.id} launch={launch} />
                ))
            ): (
                <p>You haven't booked any trips!</p>
            )}
        </Fragment>
    )
}

export default Profile;
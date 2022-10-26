import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '../../node_modules/@mui/material/Table'
import TableBody from '../../node_modules/@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '../../node_modules/@mui/material/Paper'
import '../App.css'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(idx,word,frequency) {
	return { idx,word,frequency};
}


export default function FrequencyTable({items}) {

	const rows=items.map((item)=>{
		return createData(item.idx,item.word,item.frequency)
	});



	return (
		<>
		<TableContainer component={Paper}>
		<Table sx={{ minWidth: 700 }} aria-label="customized table">
		<TableHead>
		<TableRow>
		<StyledTableCell>ID</StyledTableCell>
		<StyledTableCell>Word</StyledTableCell>
		<StyledTableCell>Frequency</StyledTableCell>
		</TableRow>
		</TableHead>
		<TableBody>
		{
			rows.map((row,idx) => (
				<StyledTableRow key={idx}>
				<StyledTableCell>{idx}</StyledTableCell>
				<StyledTableCell>{row.word}</StyledTableCell>
				<StyledTableCell>{row.frequency}</StyledTableCell>
				</StyledTableRow>
			))
		}
		</TableBody>
		</Table>
		</TableContainer>

		</>

	);
}